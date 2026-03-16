'use client';

import * as z from "zod";
import { profileFormSchema } from "@/schemas/onboarding.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Textbox from "@/components/shared/Textbox";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Profile = () => {

  const router = useRouter();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",

    defaultValues: {
      name: "",
      role: "",
      teamSize: undefined,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    try {

      const res = await fetch("/api/onboarding/profile", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      toast.success("Profile saved");

      router.push("/onboarding/workspace");

    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <section className="mx-auto max-w-md w-full">

      {/* STEP INDICATOR */}
      <div className="flex justify-end mb-6">
        <span className="text-sm text-muted-foreground">
          2/4
        </span>
      </div>

      {/* TEXT HEADER */}
      <Textbox
        title="Tell us about yourself"
        desc="This helps us personalize your workspace experience."
      />

      {/* FORM */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 space-y-6"
      >

        <FieldGroup>

          {/* NAME */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>

                <FieldLabel>
                  What should we call you
                </FieldLabel>

                <Input
                  {...field}
                  placeholder="Enter your name"
                  className="input-field"
                />

                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}

              </Field>
            )}
          />

          {/* ROLE */}
          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>

                <FieldLabel>
                  What's your role?
                </FieldLabel>

                <Input
                  {...field}
                  placeholder="Founder, Developer, Designer..."
                  className="input-field"
                />

                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}

              </Field>
            )}
          />

        </FieldGroup>

        {/* TEAM SIZE */}
        <Controller
          name="teamSize"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>

              <FieldLabel>
                Are you working solo or with a team?
              </FieldLabel>

              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="mt-4 space-y-3"
              >

                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="solo" id="solo" />
                  <label htmlFor="solo">Just me</label>
                </div>

                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="2-10" id="team2" />
                  <label htmlFor="team2">2 - 10 teammates</label>
                </div>

                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="11-50" id="team3" />
                  <label htmlFor="team3">11 - 50 teammates</label>
                </div>

                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="50+" id="team4" />
                  <label htmlFor="team4">50+ teammates</label>
                </div>

              </RadioGroup>

              {fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}

            </Field>
          )}
        />

        {/* CONTINUE BUTTON */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-6 active:scale-[0.98]"
        >
          {isSubmitting ? "Saving..." : "Continue"}
        </Button>

      </form>

    </section>
  );
}

export default Profile