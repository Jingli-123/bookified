import MultipleBooks from "./shared/MultipleBooks";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    ids?: string;
  }>;
}) {

  const params = await searchParams;

  console.log("params", params);

  const bookIds =
    params.ids?.split(",") ?? [];

  console.log("bookIds", bookIds);

  return (
    <MultipleBooks bookIds={bookIds} />
  );
}