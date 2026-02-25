export const ads = [
    {
        id: 1,
        image: "/images/imagem1.jpg",
        url: "https://cliente1.com",
        weight: 1,                  // quanto maior, mais aparece
        priority: 1,                // 1 = normal, 2 = destaque
        active: true,               // se está ativo ou não
        startDate: "2026-01-01",    // data para a imagem começar a ser exibida
        endDate: "2026-12-31"       // data para a imagem parar de ser exibida
    },
    {
        id: 2,
        image: "/images/imagem2.jpg",
        url: "https://cliente2.com",
        weight: 1,
        priority: 1,
        active: true,
        startDate: "2026-01-01",
        endDate: "2026-06-30"
    }
];