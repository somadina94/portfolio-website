import { Certification } from "@/types/certification";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function CertsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from<"certifications", Certification>("certifications")
    .select("*")
    .order("date_issued", { ascending: false });

  if (error) {
    console.error(error);
  }
  return (
    <div className="px-4">
      <h2 className="text-primary">Certifications</h2>
      <p className="text-muted-foreground mb-24">
        Here are some of my professional certifications that demonstrate my
        commitment to continuous learning and expertise in the field.
      </p>
      <div className="flex flex-col gap-4 mb-8">
        {data?.map((cert) => (
          <div
            key={cert.id}
            className="border-b-2 border-b-muted-foreground/10 pb-12"
          >
            <div>
              <Image
                src={cert.badge_url as string}
                alt={cert.title}
                width={140}
                height={140}
              />
              <h3 className="mb-12">{cert.title}</h3>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <Image
                  src={cert.image_url as string}
                  alt={cert.title}
                  width={500}
                  height={380}
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <div>
                  <h4>Issued By</h4>
                  <p className="text-muted-foreground">{cert.issuer}</p>
                </div>
                <div>
                  <h4>Date Issued</h4>
                  <p className="text-muted-foreground">{cert.date_issued}</p>
                </div>

                <div>
                  <h4>Description</h4>
                  <p className="text-muted-foreground">{cert.description}</p>
                </div>
                <div>
                  <Link
                    href={cert.certificate_url}
                    className="text-primary underline"
                  >
                    Verification link
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
