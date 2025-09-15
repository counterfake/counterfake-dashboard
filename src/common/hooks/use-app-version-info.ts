import { useEffect, useState } from "react";

import { getVersion } from "@/common/server/actions/get-version";

export function useAppVersionInfo() {
  const [version, setVersion] = useState<Awaited<
    ReturnType<typeof getVersion>
  > | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const version = await getVersion();
      setVersion(version);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { version, isLoading };
}
