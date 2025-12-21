import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { GhostAnchorText } from "@/components/ui/ghost-anchor-text";
import { AnchorText } from "@/components/ui/anchor-text";

interface Product {
  title: string;
  image: string;
  description: string;
  downloadUrl: string;
  landingPageUrl: string;
}

const products: Product[] = [
  {
    title: "Matcharge",
    image: "/images/icon-matcharge.jpg",
    description:
      "A calm, mindful subscription manager that helps you track all your bills, recurring charges, and free trials without the stress.",
    downloadUrl:
      "https://apps.apple.com/us/app/subscription-manager-matcha/id6752604627", // Update with actual URL
    landingPageUrl: "https://matcharge.app", // Update with actual URL
  },
  {
    title: "Pippin",
    image: "/images/icon-pippin.jpg",
    description:
      "A minimalist journaling app designed for overthinkers. A safe place for your thoughts. No pressure, no judgment, no advice.",
    downloadUrl:
      "https://apps.apple.com/us/app/pippin-overthinking-journal/id6755423327", // Update with actual URL
    landingPageUrl: "https://getpippin.app", // Update with actual URL
  },
];

export default function HomeIndieProductsSection() {
  return (
    <section className="p-5 pb-6 w-full bg-white rounded-xl shadow-md space-y-6">
      <div className="space-y-2">
        <p className="text-gray-700 ">
          I’m currently on a sabbatical. Using the time to slow down,
          experiment, and build small products that feel calm, useful, and
          human.
        </p>
      </div>

      <div className="grid gap-12 md:gap-4 md:grid-cols-2">
        {products.map((product) => (
          <div key={product.title} className="space-y-4">
            <div className="aspect-square size-20 relative bg-gray-100 rounded-2xl shadow-md overflow-hidden hover:rotate-6">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <GhostAnchorText
                href={product.landingPageUrl}
                className="text-sm font-medium flex items-center w-fit"
                hoverColor="hover:bg-blue-500 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="text-xl font-semibold">{product.title}</h3>
                <ArrowTopRightOnSquareIcon className="inline h-4 w-4 ml-1" />
              </GhostAnchorText>

              <p className="text-gray-600 text-sm">{product.description}</p>
            </div>

            {product.downloadUrl && (
              <div className="flex flex-col gap-1">
                <div className="flex flex-col items-start gap-2">
                  <a
                    href={product.downloadUrl}
                    className="inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1761091200"
                      alt="Download on the App Store"
                      className="w-full h-15 align-vertical-middle object-contain"
                    />
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
