import { Dock } from "components/Dock";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

export default function UserPage() {
  const router = useRouter();
  const username = router.query.username as string | null;

  if (!username) return null;

  const user = api.users.getOne.useQuery({ username: username });

  return (
    <>
      <Head>
        <title>
          {user.data ? `Dockhunt | ${user.data.username}` : "Dockhunt"}
        </title>
        <meta name={'og:image'} content={`/api/og?username=${username}`} key={'opengraph-image'} />
      </Head>
      <main className="flex h-screen w-screen flex-col items-center bg-mojave bg-cover text-white">
        {user.data ? (
          <>
            {user.data.avatarUrl && (
              <Image
                src={user.data.avatarUrl}
                alt={`${user.data.name} avatar`}
                className="mt-60 rounded-full"
                width="150"
                height="150"
              />
            )}
            <h1 className="mt-2 text-[40px] font-black">{user.data.name}</h1>
            <p className="mt-3 text-gray-400">{user.data.description}</p>
            <div className="mt-2 flex gap-4">
              <a
                className="text-gray-400 hover:underline"
                href={`https://twitter.com/${username}`}
                target="_blank"
                rel="noreferrer"
              >
                @{username}
              </a>
            </div>

            <div className="absolute bottom-10">
              {user.data.dock && (
                <Dock
                  apps={user.data.dock.dockItems.map(
                    (dockItem) => dockItem.app
                  )}
                />
              )}
            </div>
          </>
        ) : (
          <span>Loading...</span>
        )}
      </main>
    </>
  );
}
