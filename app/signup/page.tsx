"use client";

import { SubmitButton } from "../../components/button/submit-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { updateUser } from "../api/user";
import { useSession } from "next-auth/react";
import { UserProps } from "@/types/user";
import { redirect, useRouter } from "next/navigation";

const selectItems = [
  { id: "door", value: "door", label: "도어센서" },
  { id: "motion", value: "motion", label: "모션센서" },
  { id: "temp", value: "temp", label: "온습도센서" },
  { id: "light", value: "light", label: "조명제품" },
  { id: "curtain", value: "curtain", label: "커튼, 블라인드" },
  { id: "remote", value: "remote", label: "리모컨허브" },
  { id: "etc", value: "etc", label: "기타" },
];

export default function SignUp() {
  const { data } = useSession();
  const router = useRouter();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<UserProps>();

  const formData = watch();

  const action: () => void = handleSubmit(async (data) => {
    const success = await updateUser(data);
    if (success) {
      router.push("/management");
    }
  });

  useEffect(() => {
    if (data?.user?.email) {
      setValue("email", data?.user?.email);
    }
  }, [data?.user?.email]);

  return (
    <div className="flex-1 flex flex-col w-full px-8 justify-center gap-2">
      <div className="space-y-3 mb-12">
        <div className="font-bold text-4xl mb-10">
          헤이홈 OpenAPI 사용 신청서
        </div>
        <div>
          <div>안녕하세요 :)</div>
          <div>헤이홈 OpenAPI를 활용하여 다양한 부가가치를 만들어보세요!</div>
        </div>
        <div>
          <div>현재는 무료로 사용 가능합니다!</div>
          <div className="text-sm">(추후 사용량에 따라 유료로 전환 예정)</div>
        </div>
        <div className="text-sm">
          <div>기타 문의는 아래를 참고해주세요 :)</div>
          <div>
            - 개발 관련 :{" "}
            <span className="font-semibold">devteam@goqual.com</span>
          </div>
          <div>
            - 제품 구매 관련 :{" "}
            <span className="font-semibold">service@goqual.com</span>
          </div>
          <div>
            - 기타 비즈니스 협업 관련 :{" "}
            <span className="font-semibold">biz@goqual.com</span>
          </div>
        </div>
      </div>
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-5"
        action={action}
      >
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">
            <span className="text-red-400">*</span>
            사용자 이름 또는 회사 이름을 적어주세요.
          </Label>
          <Input
            id="name"
            placeholder="이름"
            {...register("name", {
              required: "이름을 입력하세요.",
            })}
          />
          <div className="text-red-500 text-sm">
            {(errors?.name?.message as String) || ""}
          </div>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="phone">
            <span className="text-red-400">*</span>
            사용자 또는 담당자의 연락처를 알려주세요.
          </Label>
          <Input
            id="phone"
            placeholder="연락처"
            {...register("phone", {
              required: "연락처를 입력하세요.",
            })}
          />
          <div className="text-red-500 text-sm">
            {(errors?.phone?.message as String) || ""}
          </div>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">
            <span className="text-red-400">*</span>
            사용자 또는 담당자의 이메일 주소를 적어주세요.
          </Label>
          <div className="flex items-center gap-1">
            <Input
              id="email"
              type="email"
              disabled
              aria-disabled
              {...register("email", {
                required: "이메일을 입력하세요.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "이메일 형식이 올바르지 않습니다.",
                },
              })}
            />
          </div>

          <div className="text-red-500 text-sm">
            {(errors?.email?.message as String) || ""}
          </div>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="purpose">
            <span className="text-red-400">*</span>
            사용 목적을 알려주세요 (최대한 상세하게)
          </Label>

          <Textarea
            id="purpose"
            placeholder="사용 목적"
            {...register("purpose", {
              required: "사용 목적을 입력하세요.",
            })}
          />
          <div className="text-red-500 text-sm">
            {(errors?.purpose?.message as String) || ""}
          </div>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="redirectUri">
            <span className="text-red-400">*</span>
            Redirect URI (OAuth2.0 Authorization Code 가 전달될 URI)
          </Label>
          <Input
            id="redirectUri"
            placeholder="Redirect URI"
            {...register("redirectUri", {
              required: "Redirect URI를 입력하세요.",
            })}
          />
          <div className="text-red-500 text-sm">
            {(errors?.redirectUri?.message as String) || ""}
          </div>
        </div>
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="device">
            <span className="text-red-400">*</span>
            어떤 기기의 API를 사용하고자 하시나요?
          </Label>
          <Controller
            control={control}
            name="device"
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {selectItems.map((item) => (
                  <div className="flex items-center space-x-2" key={item.id}>
                    <RadioGroupItem value={item.value} id={item.id} />
                    <Label className="w-20" htmlFor={item.id}>
                      {item.label}
                    </Label>
                    {item.id === "etc" && (
                      <Input
                        {...register("etcDevice", {
                          validate: (val) =>
                            formData?.device === "etc" && !val
                              ? "기타 내용을 입력하세요."
                              : true,
                        })}
                        id="etcDevice"
                        disabled={formData.device !== "etc"}
                      />
                    )}
                  </div>
                ))}
              </RadioGroup>
            )}
            rules={{
              required: "사용기기를 선택하세요.",
            }}
          />
          <div className="text-red-500 text-sm">
            {(errors?.device?.message as String) ||
              (errors?.etcDevice?.message as String) ||
              ""}
          </div>
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="isPlannedSubscribe">
            <span className="text-red-400">*</span>
            이벤트 구독 서비스도 사용 예정인가요?
          </Label>
          <Controller
            control={control}
            name="isPlannedSubscribe"
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="use" id="used" />
                  <Label htmlFor="used">사용</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unUsed" id="unUsed" />
                  <Label htmlFor="unUsed">미사용</Label>
                </div>
              </RadioGroup>
            )}
            rules={{
              required: "구독서비스 여부를 선택하세요.",
            }}
          />
          <div className="text-red-500 text-sm">
            {(errors?.isPlannedSubscribe?.message as String) || ""}
          </div>
        </div>

        <SubmitButton
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2 text-white hover:bg-opacity-90 duration-300"
          pendingText="Signing Up..."
        >
          신청하기
        </SubmitButton>
      </form>
    </div>
  );
}
