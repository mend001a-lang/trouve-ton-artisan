
const API_URL = "https://trouve-ton-artisan-yagt.onrender.com";

// Récupérer tous les artisans depuis notre API
export async function recupererArtisans() {
  const reponse = await fetch(`${API_URL}/artisans`);

  if (!reponse.ok) {
    throw new Error("Impossible de récupérer les artisans.");
  }

  const artisans = await reponse.json();

  return artisans;
}

// Récupérer les trois artisans du mois
export async function recupererArtisansDuMois() {
  const reponse = await fetch(`${API_URL}/artisans-du-mois`);

  if (!reponse.ok) {
    throw new Error("Impossible de récupérer les artisans du mois.");
  }

  const artisans = await reponse.json();

  return artisans;
}