import { Title } from "@/components/ui/title/Title";
import { auth } from "@/utils/auth.config";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div>
      <Title title="Perfil"></Title>
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
      <h3 className = "text-3xl mb-10"> {session.user.role} </h3>
    </div>
  );
}