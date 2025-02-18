// firebase.js
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
  getDocs,
  getDoc,
  doc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuOnm1am9zK0hNFzfm_gQdolaemOI1OJo",
  authDomain: "trifecta-platform.firebaseapp.com",
  projectId: "trifecta-platform",
  storageBucket: "trifecta-platform.appspot.com",
  messagingSenderId: "478553669328",
  appId: "1:478553669328:web:3a9fe188af4b6760b168d5",
  measurementId: "G-H0LY60QGF0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized successfully!");

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

export async function getUserInfo(user) {
  const colRef = collection(db, "tenants");
  let admins;
  admins = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.map((doc) => {
    admins.push({ ...doc.data(), id: doc.id });
    // console.log(doc);
  });

  const selected = admins.find(
    (admin) => admin.companyName === user.displayName
  );

  return selected;
}

export async function getUserInfoByTenant(user, tenantName) {
  try {
    const tenantDocRef = doc(db, "tenants", tenantName);
    const userCollectionRef = collection(tenantDocRef, "users");
    const snapshot = await getDocs(userCollectionRef);

    let users = [];
    snapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });

    const selectedUser = users.find((userDoc) => userDoc.uid === user.uid);

    return selectedUser;
  } catch (error) {
    console.error("Error retrieving user info:", error);
    return null;
  }
}

// Function to create users collection inside tenant
export async function createUserCollection(companyName) {
  try {
    // Use doc function to create a reference to the document
    const tenantDocRef = doc(db, "tenants", companyName);
    const userCollectionRef = collection(tenantDocRef, "users");
    // Add a dummy document to the collection to ensure it is created immediately
    await addDoc(userCollectionRef, { dummyField: "dummyValue" });
    console.log("User collection created successfully");
    return true;
  } catch (error) {
    console.error("Error creating user collection:", error);
    return false;
  }
}

// Function to add a user to the users collection
export async function addUser(companyName, userData) {
  try {
    const tenantDocRef = doc(db, "tenants", companyName);
    const userCollectionRef = collection(tenantDocRef, "users");

    // Create auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.userEmail,
      userData.userPassword
    );
    await updateProfile(userCredential.user, { displayName: companyName });
    // Access the newly created user object
    const user = userCredential.user;

    console.log(
      "User signed up successfully:",
      user.email,
      " from ",
      user.displayName
    );

    // Append the user.uid to the userData object
    userData.uid = user.uid;

    // Add user document to the Users collection
    await addDoc(userCollectionRef, userData);

    console.log("User added successfully");
    return true;
  } catch (error) {
    console.error("Error adding user:", error);
    return false;
  }
}

// Function to delete a user document from the users collection
export async function deleteUser(companyName, userId) {
  try {
    const tenantDocRef = doc(db, "tenants", companyName);
    const userCollectionRef = collection(tenantDocRef, "users");

    // Reference to the specific user document
    const userDocRef = doc(userCollectionRef, userId);

    // Check if the user document exists
    const userDocSnapshot = await getDoc(userDocRef);
    if (!userDocSnapshot.exists()) {
      console.log("User not found");
      return false;
    }

    // Delete the user document
    await deleteDoc(userDocRef);

    console.log("User deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
}

// Function to get user details from the users collection
export async function getUserDetails(companyName, userId) {
  try {
    const tenantDocRef = doc(db, "tenants", companyName);
    const userCollectionRef = collection(tenantDocRef, "users");

    const userDoc = await userCollectionRef.doc(userId).get();
    if (userDoc.exists) {
      return userDoc.data();
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting user details:", error);
    return null;
  }
}

// Function to set theme preference for a company
export async function setCompanyThemePreference(companyName, themePreference) {
  try {
    const companyDocRef = doc(db, "tenants", companyName);

    // Update the company document to set the theme preference field
    await updateDoc(companyDocRef, {
      themePreference: themePreference || "default", // Set the theme preference or use default value
    });

    console.log("Company theme preference set successfully");
    return true;
  } catch (error) {
    console.error("Error setting company theme preference:", error);
    return false;
  }
}

export async function setServices(companyName, serviceName, value) {
  try {
    const companyDocRef = doc(db, "tenants", companyName);

    switch (serviceName) {
      case "inventory":
        await updateDoc(companyDocRef, {
          service_inventory: value,
        });
        break;
      case "logistics":
        await updateDoc(companyDocRef, {
          service_logistics: value,
        });
        break;
      case "procurement":
        await updateDoc(companyDocRef, {
          service_procurement: value,
        });
        break;
    }
    console.log("Company service preference set successfully");
    return true;
  } catch (error) {
    console.error("Error setting company service preference:", error);
    return false;
  }
}

// TESTING

const company = "Trifecstars";
const userID = "AAdcUedrcIGcSU0NGUTz";
const userData = {
  userFirstName: "John",
  userLastName: "Smith",
  userPassword: "password123!",
  userEmail: "john@example.com",
  userRole: "employee",
};
/* createUserCollection(company); */
//addUser(company, userData);
/* deleteUser(company, userID); */

/* const currentUser =  // Get the authenticated user object from your authentication context or state
const tenantName = // Get the name of the tenant

const userInTenant = await getUserInfoByTenant(currentUser, tenantName);

// Log the user information to test
console.log("User in Tenant:", userInTenant); */
