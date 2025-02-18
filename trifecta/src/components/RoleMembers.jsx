

export default function RoleMembers(props) {
  const memberList = props.members.map((member) => 
        <div key={member.id} className="flex items-center justify-between font-bold p-3 mb-4 rounded bg-gray px-8">
            <span>{member.name}</span>
            <span onClick={() => handleRemoveMember(member.id)} className="cursor-pointer text-red-500">❌</span>
        </div>
    );

  return (
    memberList
  );
}