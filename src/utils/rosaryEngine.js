import { PRAYERS } from "../data/rosaryConstants";

export function generateRosarySequence(mysteriesOfToday) {
    const sequence = [];

    // 1. Início (Oferecimento, Credo)
    sequence.push({
        id: crypto.randomUUID(),
        type: "inicio",
        label: "Oferecimento",
        text: PRAYERS.oferecimento.text, // Adicionado .text
    });

    sequence.push({
        id: crypto.randomUUID(),
        type: "cruz",
        label: "Sinal da Cruz e Credo",
        // CORREÇÃO: No constants é 'creio', não 'credo', e precisa do .text
        text: PRAYERS.creio ? PRAYERS.creio.text : "Creio em Deus Pai...",
    });

    sequence.push({
        id: crypto.randomUUID(),
        type: "conta-grande",
        label: "Pai Nosso",
        text: PRAYERS.paiNosso.text, // Adicionado .text
    });

    sequence.push({
        id: crypto.randomUUID(),
        type: "conta-pequena",
        label: "Ave Maria (Fé)",
        text: PRAYERS.aveMaria.text, // Adicionado .text
    });
    sequence.push({
        id: crypto.randomUUID(),
        type: "conta-pequena",
        label: "Ave Maria (Esperança)",
        text: PRAYERS.aveMaria.text, // Adicionado .text
    });
    sequence.push({
        id: crypto.randomUUID(),
        type: "conta-pequena",
        label: "Ave Maria (Caridade)",
        text: PRAYERS.aveMaria.text, // Adicionado .text
    });

    sequence.push({
        id: crypto.randomUUID(),
        type: "gloria",
        label: "Glória",
        text: PRAYERS.gloria.text, // Adicionado .text
    });

    // 2. Os 5 Mistérios
    mysteriesOfToday.forEach((m, index) => {
        sequence.push({
            id: crypto.randomUUID(),
            type: "pai-nosso-misterio",
            label: "Pai Nosso",
            text: PRAYERS.paiNosso.text, // Adicionado .text
            mysteryInfo: {
                number: index + 1,
                // Nota: Se estiver usando dados locais (DETAILED_MYSTERIES), 'm' é uma string, não objeto.
                // Se for da API, 'm' pode ser objeto. Vale conferir se m.label existe.
                label: m.label || m,
                description: m.text || ""
            }
        });

        // 10 Ave Marias
        for (let i = 1; i <= 10; i++) {
            sequence.push({
                id: crypto.randomUUID(),
                type: "conta-pequena",
                label: `${i}ª Ave Maria`,
                text: PRAYERS.aveMaria.text, // Adicionado .text
            });
        }

        // Glória e Jaculatória
        sequence.push({
            id: crypto.randomUUID(),
            type: "gloria",
            label: "Glória",
            text: PRAYERS.gloria.text, // Adicionado .text
        });

        sequence.push({
            id: crypto.randomUUID(),
            type: "jaculatoria",
            label: "Jaculatória",
            text: PRAYERS.jaculatoria.text, // Adicionado .text
        });
    });

    // 3. Finalização
    sequence.push({
        id: crypto.randomUUID(),
        type: "final",
        label: "Salve Rainha",
        text: PRAYERS.salveRainha.text, // Adicionado .text
    });

    return sequence;
}