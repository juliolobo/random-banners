import { ads } from "./ads";

function isWithinDateRange(ad) {
    const now = new Date();
    const start = new Date(ad.startDate);
    const end = new Date(ad.endDate);
    return now >= start && now <= end;
}

function weightedRandom(items) {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;

    for (const item of items) {
        if (random < item.weight) return item;
        random -= item.weight;
    }
}

export async function onRequest(context) {

    const baseUrl = new URL(context.request.url).origin;

    // Filtrar ativos e dentro do período
    let validAds = ads.filter(ad =>
        ad.active && isWithinDateRange(ad)
    );

    if (validAds.length === 0) {
        return new Response(JSON.stringify({
            error: "Nenhum banner disponível"
        }), { status: 404 });
    }

    // Separar por prioridade
    const maxPriority = Math.max(...validAds.map(ad => ad.priority));
    validAds = validAds.filter(ad => ad.priority === maxPriority);

    // Aplicar rotação por peso
    const selected = weightedRandom(validAds);

    return new Response(JSON.stringify({
        image: baseUrl + selected.image,
        url: selected.url
    }), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
        }
    });
}
