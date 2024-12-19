"use client";

import ApiCaller from "@/api-caller";
import { ConfigVstepB2 } from "@/types/vstep-b2-exam";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type CommonContextFields = {
  vstepB2Cfg: ConfigVstepB2;
  redirectTo: (path: string) => void;
};

const CommonContext = createContext<CommonContextFields>({
  vstepB2Cfg: {
    readingTimebox: 0,
    listeningTimebox: 0,
    writingTimebox: 0,
    speakingTimebox: 0,
  },
  redirectTo: () => {
    //
  },
});

export function CommonProvider({ children }: { children: any }) {
  const router = useRouter();
  const [vstepB2Cfg, setVstepB2Cfg] = useState<ConfigVstepB2>({
    readingTimebox: 0,
    listeningTimebox: 0,
    writingTimebox: 0,
    speakingTimebox: 0,
  });

  const redirectTo = useCallback((path: string) => {
    router.push(path);
  }, []);

  useEffect(() => {
    ApiCaller.getVstepB2Config().then((cfg) => {
      setVstepB2Cfg(cfg);
    });
  }, []);

  return (
    <CommonContext.Provider value={{ vstepB2Cfg, redirectTo }}>
      {children}
    </CommonContext.Provider>
  );
}

export const useCommon = () => useContext(CommonContext);
