import express from "express";
import cors from "cors";
import multer from "multer";
import firebaseAdmin from "firebase-admin";
import { db, storage } from "./FirebaseClient.js";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import * as fs from "fs";
import bodyParser from "body-parser";
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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKeys.json", "utf8")
);

const firebaseApp = initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const auth = getAuth(firebaseApp);
const app = express();

app.use(cors());
app.use(express.json());

app.use(
  bodyParser.urlencoded({
    limit: "25mb",
    extended: false,
  })
);
app.use(bodyParser.json({ limit: "25mb" }));

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

//handles upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
});

// Function to check if email exists
export async function emailExists(email) {
  try {
    const user = await auth.getUserByEmail(email);
    return !!user;
  } catch (error) {
    return false;
  }
}

// POST endpoint to check if email exists
app.post("/check-email-exists", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const exists = await emailExists(email);
    res.json({ exists });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Edit Company Profile
app.post(
  "/edit-company-profile/:id",
  upload.single("tenant-image"),
  async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const dateTime = new Date();
    const {
      companyDesc1,
      companyName1,
      companyIndustry1,
      companyAddress1,
      tenantFirstName1,
      tenantLastName1,
      companyLogo1,
    } = req.body;
    let downloadURL;
    const tenantImage = req.body["tenant-image"];
    console.log(req.file);
    console.log("Here: " + tenantImage);

    try {
      if (tenantImage === undefined) {
        const storageRef = ref(storage, `tenant_logos/${req.file + dateTime}`);
        let metadata = {};
        if (req.file) {
          metadata = { contentType: req.file.type };
        } else {
          console.log("No File Uploaded");
        }

        const snapshot = await uploadBytesResumable(
          storageRef,
          req.file.buffer,
          metadata
        );
        downloadURL = await getDownloadURL(snapshot.ref);
      } else {
        downloadURL = companyLogo1;
      }
      console.log("params: ", req.params.id);
      const docRef = doc(db, "tenants", req.params.id);

      await updateDoc(docRef, {
        companyAddress: companyAddress1 || null,
        companyName: companyName1 || null,
        companyIndustry: companyIndustry1 || null,
        firstName: tenantFirstName1 || null,
        lastName: tenantLastName1 || null,
        companyLogo: downloadURL || null,
        companyDescription: companyDesc1 || null,
      })
        .then(() => {
          console.log("Doc updated successfully");
        })
        .catch((error) => {
          console.log(`Error in updating doc: ${error}`);
        });

      res.status(200).json({
        success: true,
        message: "Successfully edited",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: "Failed to edit Company Profile",
      });
    }
  }
);
