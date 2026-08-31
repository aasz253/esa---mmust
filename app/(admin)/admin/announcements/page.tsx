import { prisma } from "@/lib/prisma";
import { createAnnouncement, deleteAnnouncement } from "@/lib/actions";
import { ServerActionForm } from "@/components/ServerActionForm";
import { ImageUpload } from "@/components/ImageUpload";
import { formatDate } from "@/lib/utils";

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-[#0f2a4a]">
        Announcements
      </h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-6">
          <h3 className="font-display text-lg font-bold text-[#0f2a4a]">Post</h3>
          <ServerActionForm
            action={createAnnouncement}
            submitLabel="Publish"
            className="mt-4 space-y-3"
          >
            <label className="block">
              <span className="mb-1 block text-sm text-[#4d6a92]">Title</span>
              <input
                name="title"
                required
                className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm text-[#4d6a92]">Category</span>
              <input
                name="category"
                placeholder="General / Events"
                className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm text-[#4d6a92]">Content</span>
              <textarea
                name="content"
                rows={4}
                required
                className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-[#4d6a92]">
              <input type="checkbox" name="featured" className="accent-[#3aa0ff]" />
              Featured (appears at top)
            </label>
            <ImageUpload name="image" label="Image (from device, optional)" />
          </ServerActionForm>
        </div>

        <div className="rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-6">
          <h3 className="font-display text-lg font-bold text-[#0f2a4a]">
            {announcements.length} Posts
          </h3>
          {announcements.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {announcements.map((a) => (
                <li
                  key={a.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[#0f2a4a]">
                      {a.featured && (
                        <span className="mr-2 rounded bg-[#f0a500]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#d99a00]">
                          FEATURED
                        </span>
                      )}
                      {a.title}
                    </p>
                    <p className="mt-1 text-xs text-[#6b84a8]">
                      {formatDate(a.createdAt)} · {a.category}
                    </p>
                  </div>
                  <form action={deleteAnnouncement}>
                    <input type="hidden" name="id" value={a.id} />
                    <button className="rounded-lg bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/25">
                      Delete
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-[#6b84a8]">No announcements yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
