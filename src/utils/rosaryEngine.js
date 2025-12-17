import { PRAYERS } from "../data/rosaryConstants";

export function generateRosarySequence(mysteriesOfToday) {
    const sequence = [];

    // 1. Início (Oferecimento, Credo)
    sequence.push({
        id: crypto.randomUUID(),
        type: "inicio",
        label: "Oferecimento",
        text: PRAYERS.oferecimento,
    });

    sequence.push({
        id: crypto.randomUUID(),
        type: "cruz",
        label: "Sinal da Cruz e Credo",
        text: PRAYERS.credo,
    });

    sequence.push({
        id: crypto.randomUUID(),
        type: "conta-grande",
        label: "Pai Nosso",
        text: PRAYERS.paiNosso,
    });

    sequence.push({
        id: crypto.randomUUID(),
        type: "conta-pequena",
        label: "Ave Maria (Fé)",
        text: PRAYERS.aveMaria,
    });
    sequence.push({
        id: crypto.randomUUID(),
        type: "conta-pequena",
        label: "Ave Maria (Esperança)",
        text: PRAYERS.aveMaria,
    });
    sequence.push({
        id: crypto.randomUUID(),
        type: "conta-pequena",
        label: "Ave Maria (Caridade)",
        text: PRAYERS.aveMaria,
    });

    sequence.push({
        id: crypto.randomUUID(),
        type: "gloria",
        label: "Glória",
        text: PRAYERS.gloria,
    });

    // 2. Os 5 Mistérios
    mysteriesOfToday.forEach((m, index) => {
        // AQUI ESTÁ A MUDANÇA:
        // Não criamos mais o { type: 'misterio' }.
        // Criamos direto o Pai Nosso, mas com dados extras do mistério.
        sequence.push({
            id: crypto.randomUUID(),
            type: "pai-nosso-misterio", // Novo tipo combinado
            label: "Pai Nosso",
            text: PRAYERS.paiNosso,
            mysteryInfo: {
                number: index + 1,
                label: m.label, // Ex: "1º Mistério: A Ressurreição"
                description: m.text // Texto bíblico ou reflexão
            }
        });

        // 10 Ave Marias
        for (let i = 1; i <= 10; i++) {
            sequence.push({
                id: crypto.randomUUID(),
                type: "conta-pequena",
                label: `${i}ª Ave Maria`,
                text: PRAYERS.aveMaria,
            });
        }

        // Glória e Jaculatória
        sequence.push({
            id: crypto.randomUUID(),
            type: "gloria",
            label: "Glória",
            text: PRAYERS.gloria,
        });

        sequence.push({
            id: crypto.randomUUID(),
            type: "jaculatoria",
            label: "Jaculatória",
            text: PRAYERS.jaculatoria,
        });
    });

    // 3. Finalização
    sequence.push({
        id: crypto.randomUUID(),
        type: "final",
        label: "Salve Rainha",
        text: PRAYERS.salveRainha,
    });

    return sequence;
}