export async function uploadImage(file: File): Promise<string> {
  const data = new FormData();
  data.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    { method: "POST", body: data }
  );
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error("Image upload failed");
  }
  return json.data.display_url as string;
}