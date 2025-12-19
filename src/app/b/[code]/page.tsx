"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Kanban } from "../../components/Kanban";
import React from "react";

export default function BoardPage({ paramsPromise }: { paramsPromise: Promise<{ code: string }> }) {
  const [code, setCode] = React.useState<string | null>(null);

  React.useEffect(() => {
    paramsPromise.then((p) => setCode(p.code));
  }, [paramsPromise]);

  const board = useQuery(api.boards.getBoardByCode, { code });

  if (!board) return <p>Loading...</p>;

  return <Kanban board={board} />;
}
