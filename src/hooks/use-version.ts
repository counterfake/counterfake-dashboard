import { useEffect, useState } from "react";

import { getVersion } from "@/actions/get-version";

export function useVersion() {
  const [version, setVersion] = useState<Awaited<
    ReturnType<typeof getVersion>
  > | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const version = await getVersion();
      setVersion(version);
    };

    fetchData();
  }, []);

  return version;
}
