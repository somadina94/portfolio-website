"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { createClient } from "@/lib/supabase/browser";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(8, "Add at least a short description"),
  year: z.string().min(2, "Year is required"),
  demolink: z.string().url("Demo link must be a valid URL").or(z.literal("")),
  githublink: z.string().url("GitHub link must be a valid URL").or(z.literal("")),
  imagesText: z.string(),
  featured: z.boolean(),
});

const certSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(8, "Description is required"),
  image_url: z.string().url("Certificate image URL must be valid"),
  badge_url: z.string().url("Badge URL must be valid").or(z.literal("")),
  certificate_url: z.string().url("Verification URL must be valid").or(z.literal("")),
  issuer: z.string().min(2, "Issuer is required"),
  date_issued: z.string().min(1, "Date issued is required"),
});

type ProjectFormData = z.infer<typeof projectSchema>;
type CertFormData = z.infer<typeof certSchema>;

function parseImageUrls(input: string): string[] {
  return input
    .split(/[\n,]+/)
    .map((value) => value.trim())
    .filter(Boolean);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function AdminPanel() {
  const supabase = createClient();
  const [projectSubmitting, setProjectSubmitting] = useState(false);
  const [certSubmitting, setCertSubmitting] = useState(false);
  const [projectFiles, setProjectFiles] = useState<File[]>([]);

  const projectForm = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      year: "",
      demolink: "",
      githublink: "",
      imagesText: "",
      featured: false,
    },
  });

  const certForm = useForm<CertFormData>({
    resolver: zodResolver(certSchema),
    defaultValues: {
      title: "",
      description: "",
      image_url: "",
      badge_url: "",
      certificate_url: "",
      issuer: "",
      date_issued: "",
    },
  });

  const onProjectSubmit = async (values: ProjectFormData) => {
    setProjectSubmitting(true);
    try {
      const images = parseImageUrls(values.imagesText);
      let uploadedUrls: string[] = [];

      if (projectFiles.length > 0) {
        const projectSlug = slugify(values.title);
        const uploads = await Promise.all(
          projectFiles.map(async (file) => {
            const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
            const fileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
            const filePath = `project/${projectSlug}/${fileName}`;

            const { error } = await supabase.storage
              .from("project-images")
              .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
              });

            if (error) {
              throw error;
            }

            const { data } = supabase.storage.from("project-images").getPublicUrl(filePath);
            return data.publicUrl;
          })
        );

        uploadedUrls = uploads;
      }

      const allImages = [...uploadedUrls, ...images];

      const deduped = Array.from(new Set(allImages));
      if (deduped.length === 0) {
        toast.error("Upload at least one image or provide image URL(s).");
        return;
      }

      const payload = {
        title: values.title,
        description: values.description,
        year: values.year,
        demolink: values.demolink || null,
        githublink: values.githublink || null,
        featured: values.featured,
        images: deduped,
        imageurl: deduped[0] ?? null,
      };

      const { error } = await supabase.from("projects").insert(payload);
      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Project created.");
      projectForm.reset();
      setProjectFiles([]);
    } finally {
      setProjectSubmitting(false);
    }
  };

  const onCertSubmit = async (values: CertFormData) => {
    setCertSubmitting(true);
    try {
      const payload = {
        title: values.title,
        description: values.description,
        image_url: values.image_url,
        badge_url: values.badge_url || null,
        certificate_url: values.certificate_url || null,
        issuer: values.issuer,
        date_issued: values.date_issued,
      };

      const { error } = await supabase.from("certifications").insert(payload);
      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Certification created.");
      certForm.reset();
    } finally {
      setCertSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 py-14 md:py-20">
      <Card>
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
          <CardDescription>
            Adds a row to <code>projects</code> with <code>images[]</code>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...projectForm}>
            <form className="grid gap-4" onSubmit={projectForm.handleSubmit(onProjectSubmit)}>
              <FormField
                control={projectForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="My awesome project" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={projectForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="Short project summary..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={projectForm.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input placeholder="2026" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={projectForm.control}
                  name="demolink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Demo Link</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={projectForm.control}
                  name="githublink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub Link</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={projectForm.control}
                name="imagesText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URLs (optional, comma or new line separated)</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="https://.../image1.png&#10;https://.../image2.png"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Upload Project Images</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(event) => {
                      const files = Array.from(event.target.files ?? []);
                      setProjectFiles(files);
                    }}
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground">
                  Files are uploaded to <code>project-images/project</code> in Supabase Storage.
                </p>
                {projectFiles.length > 0 ? (
                  <p className="text-xs text-muted-foreground">
                    Selected: {projectFiles.length} file{projectFiles.length > 1 ? "s" : ""}
                  </p>
                ) : null}
              </FormItem>
              <FormField
                control={projectForm.control}
                name="featured"
                render={({ field }) => (
                  <FormItem>
                    <label className="inline-flex items-center gap-2 text-sm font-medium">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(event) => field.onChange(event.target.checked)}
                      />
                      Featured Project
                    </label>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={projectSubmitting}>
                {projectSubmitting ? "Saving..." : "Save Project"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Create Certification</CardTitle>
          <CardDescription>Adds a row to <code>certifications</code>.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...certForm}>
            <form className="grid gap-4" onSubmit={certForm.handleSubmit(onCertSubmit)}>
              <FormField
                control={certForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="AWS Certified..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={certForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="What this cert covers..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={certForm.control}
                  name="issuer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issuer</FormLabel>
                      <FormControl>
                        <Input placeholder="Google / AWS / Meta..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={certForm.control}
                  name="date_issued"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Issued</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={certForm.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={certForm.control}
                  name="badge_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Badge URL (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={certForm.control}
                  name="certificate_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification URL (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={certSubmitting}>
                {certSubmitting ? "Saving..." : "Save Certification"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
