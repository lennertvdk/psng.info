import { motion } from "framer-motion";
import cameronImg from "@/assets/Cameron.webp";
import ivanaImg from "@/assets/Ivana.webp";
import lennertImg from "@/assets/Lennert.webp";
import metaImg from "@/assets/Meta.webp";
import stelaImg from "@/assets/Stela.webp";

const team = [
  {
    name: "Cameron Hornung",
    role: "Klinischer Psychologe",
    uni: "Charité Berlin",
    bio: "Klinischer Psychologe in der Psychotherapie-Ausbildung in Berlin. Research Assistant der Psychedelic Substances Research Group der Charité. Setzt sich für einen Ort ein, an dem Menschen neugierig ihrer Leidenschaft an der Erforschung veränderter Bewusstseinszustände nachgehen können.",
    image: cameronImg,
    initials: "CH",
  },
  {
    name: "Ivana Sterr",
    role: "Medizinstudentin",
    uni: "Charité Berlin",
    bio: "Studiert Medizin und ist als studentische Hilfskraft an der Charité in der klinischen psychedelischen Forschung tätig. Inspiriert von der offenen, vernetzten Community bei Events der ALPS Foundation in der Schweiz.",
    image: ivanaImg,
    initials: "IS",
  },
  {
    name: "Lennert van de Kreeke",
    role: "Medizinstudent",
    uni: "Berlin",
    bio: "Aktiv in der klinischen Psychedelikaforschung und engagiert bei der ALPS Foundation in der Schweiz. Studiert Medizin in Berlin und sieht im PSNG großes Potenzial für Verbindung, Austausch und gemeinsame Entwicklung.",
    image: lennertImg,
    initials: "LK",
  },
  {
    name: "Meta Laubinger",
    role: "Psychologie-Masterandin",
    uni: "Bergische Universität Wuppertal",
    bio: "Klinische Psychologie-Masterandin und wissenschaftliche Hilfskraft. Überzeugt, dass Psychedelika ein kraftvolles Werkzeug zur Erforschung des Bewusstseins sind, deren therapeutisches Potenzial durch systematische Forschung nutzbar gemacht werden kann.",
    image: metaImg,
    initials: "ML",
  },
  {
    name: "Stela Malvasija",
    role: "Klinische Psychologin",
    uni: "",
    bio: "Klinische Psychologin mit besonderem Interesse an Psychedelika. Erforscht, wie veränderte Bewusstseinszustände Genesung, Verbundenheit und neue Narrative ermöglichen können – im Individuum und im Kollektiv.",
    image: stelaImg,
    initials: "SM",
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-4"
        >
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4">
            Team (a – z)
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Wer steckt dahinter?
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Das PSNG wird organisiert durch Psychologie- und Medizinstudierende
            aus Berlin und Wuppertal.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/20">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium mt-0.5">{member.role}</p>
                {member.uni && (
                  <p className="text-muted-foreground text-xs mt-0.5">{member.uni}</p>
                )}
                <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
