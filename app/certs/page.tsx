import { Certification } from "@/types/certification";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import * as motion from "motion/react-client";
import { container, item } from "@/utils/motion-config";

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
      <p className="text-muted-foreground mb-24 border-b-2">
        Here are some of my professional certifications that demonstrate my
        commitment to continuous learning and expertise in the field.
      </p>
      <div className="flex flex-col gap-4 mb-8">
        {data?.map((cert) => (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            key={cert.id}
            className="border-b-2 border-b-muted-foreground/10 pb-12"
          >
            <h3 className="text-xl font-normal text-primary mb-4">
              {cert.title}
            </h3>
            <motion.div
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              className="flex flex-col md:flex-row justify-between gap-12"
            >
              <Card className="w-48 mb-8">
                <CardContent className="flex flex-col gap-4">
                  <Image
                    src={cert.badge_url as string}
                    alt={cert.title}
                    width={140}
                    height={140}
                  />
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              className="flex flex-col lg:flex-row gap-12 justify-between"
            >
              <motion.div
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                className="max-w-138 w-full md:w-1/2"
              >
                <Card>
                  <CardContent>
                    <Image
                      src={cert.image_url as string}
                      alt={cert.title}
                      width={500}
                      height={380}
                    />
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                className="w-full md:w-1/2 space-y-4"
              >
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
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
