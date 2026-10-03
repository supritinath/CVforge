import {
  User,
  GraduationCap,
  Code2,
  FolderGit2,
  Briefcase,
  Award,
  Trophy,
  Languages,
  Heart,
  Palette,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

type Props = {
  type:
    | "about"
    | "education"
    | "skills"
    | "projects"
    | "experience"
    | "certifications"
    | "achievements"
    | "languages"
    | "interests"
    | "hobbies"
    | "email"
    | "phone"
    | "location"
    | "portfolio";
  size?: number;
};

function SectionIcon({ type, size = 16 }: Props) {
  const icons = {
    about: User,
    education: GraduationCap,
    skills: Code2,
    projects: FolderGit2,
    experience: Briefcase,
    certifications: Award,
    achievements: Trophy,
    languages: Languages,
    interests: Heart,
    hobbies: Palette,
    email: Mail,
    phone: Phone,
    location: MapPin,
    portfolio: Globe,
  };

  const Icon = icons[type];

  return <Icon size={size} />;
}

export default SectionIcon;