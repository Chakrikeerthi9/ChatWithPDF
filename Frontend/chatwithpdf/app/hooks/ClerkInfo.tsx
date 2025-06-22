import { useUser } from "@clerk/nextjs";

export function useClerkInfo() {
  const { user } = useUser();

  if (!user) return null;

  return {
    clerk_user_id: user.id,
    email: user.emailAddresses[0]?.emailAddress || "",
    name: user.fullName || user.firstName || "",
  };
}
