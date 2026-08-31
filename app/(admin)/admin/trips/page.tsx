import { prisma } from "@/lib/prisma";
import { createTrip, deleteTrip } from "@/lib/actions";
import { ServerActionForm } from "@/components/ServerActionForm";
import { ImageUpload } from "@/components/ImageUpload";
import { formatDate } from "@/lib/utils";

export default async function AdminTripsPage() {
  const trips = await prisma.trip.findMany({ orderBy: { date: "desc" } });

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-[#0f2a4a]">Trips</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-6">
          <h3 className="font-display text-lg font-bold text-[#0f2a4a]">
            Create Trip
          </h3>
          <ServerActionForm
            action={createTrip}
            submitLabel="Create Trip"
            className="mt-4 space-y-3"
          >
            <Input label="Title" name="title" required />
            <Input label="Destination" name="destination" required />
            <Input label="Organization" name="organization" />
            <Input label="Location" name="location" />
            <Input label="Date" name="date" type="date" required />
            <ImageUpload name="coverImage" label="Cover image (from device)" />
            <label className="block">
              <span className="mb-1 block text-sm text-[#4d6a92]">Description</span>
              <textarea
                name="description"
                rows={3}
                required
                className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm text-[#4d6a92]">Lessons learned</span>
              <textarea
                name="lessons"
                rows={2}
                className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
              />
            </label>
          </ServerActionForm>
        </div>

        <div className="rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-6">
          <h3 className="font-display text-lg font-bold text-[#0f2a4a]">
            {trips.length} Trips
          </h3>
          {trips.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {trips.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[#0f2a4a]">{t.title}</p>
                    <p className="text-xs text-[#6b84a8]">
                      {formatDate(t.date)} · {t.organization || "ESA"}
                    </p>
                  </div>
                  <form action={deleteTrip}>
                    <input type="hidden" name="id" value={t.id} />
                    <button className="rounded-lg bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/25">
                      Delete
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-[#6b84a8]">No trips yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({
  name,
  label,
  placeholder,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-[#4d6a92]">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
      />
    </label>
  );
}
