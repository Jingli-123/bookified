import { auth, clerkClient } from "@clerk/nextjs/server";
import { PLANS, PLAN_LIMITS, PlanType } from "@/lib/subscription-constants";

export const getUserPlan = async (): Promise<PlanType> => {
  const { userId } = await auth();

  if (!userId) {
    return PLANS.FREE;
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  console.log("user", user);

  const metadataPlan = (
    user.publicMetadata?.plan || user.publicMetadata?.billingPlan
  )
    ?.toString()
    .toLowerCase();

  if (metadataPlan === PLANS.PRO) {
    return PLANS.PRO;
  }

  if (metadataPlan === PLANS.STANDARD) {
    return PLANS.STANDARD;
  }

  return PLANS.FREE;
};

export const getPlanLimits = async () => {
  const plan = await getUserPlan();

  return PLAN_LIMITS[plan];
};
