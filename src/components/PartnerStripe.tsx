import alpsLogo from "@/assets/ALPS-Logo.webp";
import spsnLogo from "@/assets/SPSN-Logo.webp";
import unepsiLogo from "@/assets/UNEPSI-Logo.webp";
import psychedelicareLogo from "@/assets/PsychedeliCare-Logo.webp";
import psychedelicGermanyLogo from "@/assets/Psychedelic-Germany-Logo.webp";
import nachtschattenLogo from "@/assets/Nachtschatten-Logo.webp";
import psychedeliaStiftungLogo from "@/assets/Psychedelia-Stiftung-Logo.webp";

const partners = [
  { name: "ALPS Foundation", logo: alpsLogo, url: "https://alps.foundation" },
  { name: "Swiss Psychedelic Student Network", logo: spsnLogo, url: "https://www.instagram.com/swisspsychedelicstudentnetwork/" },
  { name: "UNePSI – Italy", logo: unepsiLogo, url: "https://www.instagram.com/_unepsi_/" },
  { name: "PsychedeliCare", logo: psychedelicareLogo, url: "https://psychedelicare.eu" },
  { name: "Psychedelic Germany", logo: psychedelicGermanyLogo, url: "https://psychedelic-germany.de" },
  { name: "Nachtschatten Verlag", logo: nachtschattenLogo, url: "https://nachtschatten.ch/" },
  { name: "Psychedelia Stiftung", logo: psychedeliaStiftungLogo, url: "https://psychedelia-stiftung.de/" },
];

const PartnerStripe = () => (
  <div className="bg-white border-y border-border/40 py-6">
    <div className="container mx-auto px-6">
      <p className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/35 text-center mb-5">
        In Kooperation mit
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {partners.map((partner) => (
          <a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={partner.name}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-8 max-w-[90px] object-contain hover:scale-[1.25] transition"
            />
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default PartnerStripe;
