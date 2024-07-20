import dynamic from "next/dynamic";
const DynamicDashboardContainer = dynamic(
  () => import("@/container/Dashboard")
);
const page = () => {
  return (
    <>
      <DynamicDashboardContainer />
    </>
  );
};

export default page;
