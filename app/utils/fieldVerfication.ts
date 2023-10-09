import { toast } from "sonner";

export function verifierChamps(
  imgLink: string,
  content: string,
  titre: string,
  categorie: string
) {
  if (
    imgLink.length > 0 &&
    content.length > 0 &&
    titre.length > 0 &&
    categorie.length > 0
  ) {
    if (content.length < 5) {
      console.log(content.length);
      toast.error("Le contenu doit faire au moins 5 caractères");
      return false;
    } else if (titre.length < 10) {
      toast.error("Le titre doit faire au moins 10 caractères");
      return false;
    } else {
      return true;
    }
  } else {
    toast.error("Veuillez remplir tous les champs");
    return false;
  }
}
