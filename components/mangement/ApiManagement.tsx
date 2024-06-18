"use client";

import { useEffect, useState } from "react";
import { Copy, CopyCheck } from "lucide-react";
import { SubmitButton } from "../button/submit-button";

export default function ApiManagement({
  clientId,
  clientSecret,
  action,
}: {
  clientId: string;
  clientSecret: string;
  action: () => void;
}) {
  const [checked, setChecked] = useState({
    clientId: false,
    clientSecret: false,
  });

  useEffect(() => {
    setChecked({ clientId: false, clientSecret: false });
  }, [clientId, clientSecret]);

  return (
    <div className="w-full">
      <div className="font-bold text-3xl mb-10">발급된 토큰 정보</div>
      <div className="font-semibold text-xl mb-3">clientId</div>
      <div className="flex justify-between items-center whitespace-pre overflow-auto max-w-3xl p-3 leading-7 rounded-md bg-gray-100 gap-10">
        <div>{clientId}</div>
        <div
          className="hover:cursor-pointer hover:bg-gray-200 p-2 rounded-md duration-300"
          onClick={() => {
            setChecked({ ...checked, clientId: true });
            navigator?.clipboard?.writeText(`${clientId}`);
          }}
        >
          {checked.clientId ? (
            <CopyCheck size={20} />
          ) : (
            <Copy className="hover:bg-gray-200" size={20} />
          )}
        </div>
      </div>
      <div className="font-semibold text-xl mb-3 mt-5">clientSecret</div>
      <div className="flex justify-between items-center whitespace-pre overflow-auto max-w-3xl p-3 leading-7 rounded-md bg-gray-100 gap-10">
        <div>{clientSecret}</div>
        <div
          className="hover:cursor-pointer hover:bg-gray-200 p-2 rounded-md duration-300"
          onClick={() => {
            setChecked({ ...checked, clientSecret: true });
            navigator?.clipboard?.writeText(`${clientSecret}`);
          }}
        >
          {checked.clientSecret ? (
            <CopyCheck size={20} />
          ) : (
            <Copy className="hover:bg-gray-200" size={20} />
          )}
        </div>
      </div>
      <form action={action}>
        <SubmitButton
          className="mt-5 bg-green-600 hover:bg-green-500 duration-300 text-white w-full text-center rounded-md py-2 disabled:cursor-not-allowed"
          pendingText="요청중.."
        >
          재발급
        </SubmitButton>
      </form>
    </div>
  );
}
