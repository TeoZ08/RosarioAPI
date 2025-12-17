import { PRAYERS } from "../data/rosaryConstants";

export function generateRosarySequence(mysteriesOfToday) {
    const sequence = [];

    // --- 1. INÍCIO ---

    // Oferecimento
    sequence.push({
        id: crypto.randomUUID(),
        type: "inicio",
        label: "Oferecimento",
        text: PRAYERS.oferecimento.text, // ✅ Correção: Acessando .text
    });

    // Credo (Sinal da Cruz)
    sequence.push({
        id: crypto.randomUUID(),
        type: "cruz",
        label: "Sinal da Cruz e Credo",
        // ✅ Correção: O nome correto no arquivo constants é 'creio'
        text: PRAYERS.creio ? PRAYERS.creio.text : "Creio em Deus Pai...",
    });

    // Pai Nosso inicial
    sequence.push({
        id: crypto.randomUUID(),
        type: "conta-grande",
        label: "Pai Nosso",
        text: PRAYERS.paiNosso.text, // ✅ Correção: Acessando .text
    });

    // 3 Ave Marias
    sequence.push({
        id: crypto.randomUUID(),
        type: "conta-pequena",
        label: "Ave Maria (Fé)",
        text: PRAYERS.aveMaria.text, // ✅ Correção: Acessando .text
    });
    sequence.push({
        id: crypto.randomUUID(),
        type: "conta-pequena",
        label: "Ave Maria (Esperança)",
        text: PRAYERS.aveMaria.text, // ✅ Correção: Acessando .text
    });
    sequence.push({
        id: crypto.randomUUID(),
        type: "conta-pequena",
        label: "Ave Maria (Caridade)",
        text: PRAYERS.aveMaria.text, // ✅ Correção: Acessando .text
    });

    // Glória
    sequence.push({
        id: crypto.randomUUID(),
        type: "gloria",
        label: "Glória",
        text: PRAYERS.gloria.text, // ✅ Correção: Acessando .text
    });

    // --- 2. OS 5 MISTÉRIOS ---

    // Verificamos se mysteriesOfToday é um array válido para evitar erros
    if (Array.isArray(mysteriesOfToday)) {
        mysteriesOfToday.forEach((m, index) => {

            // ✅ Correção: Lida com dados locais (string) ou da API (objeto)
            const labelMisterio = typeof m === 'string' ? m : (m.label || `Mistério ${index + 1}`);
            const textoBiblico = typeof m === 'string' ? "" : (m.text || "");

            // Pai Nosso do Mistério
            sequence.push({
                id: crypto.randomUUID(),
                type: "pai-nosso-misterio",
                label: "Pai Nosso",
                text: PRAYERS.paiNosso.text, // ✅ Correção: Acessando .text
                mysteryInfo: {
                    number: index + 1,
                    label: labelMisterio,
                    description: textoBiblico
                }
            });

            // 10 Ave Marias
            for (let i = 1; i <= 10; i++) {
                sequence.push({
                    id: crypto.randomUUID(),
                    type: "conta-pequena",
                    label: `${i}ª Ave Maria`,
                    text: PRAYERS.aveMaria.text, // ✅ Correção: Acessando .text
                });
            }

            // Glória
            sequence.push({
                id: crypto.randomUUID(),
                type: "gloria",
                label: "Glória",
                text: PRAYERS.gloria.text, // ✅ Correção: Acessando .text
            });

            // Jaculatória
            sequence.push({
                id: crypto.randomUUID(),
                type: "jaculatoria",
                label: "Jaculatória",
                text: PRAYERS.jaculatoria.text, // ✅ Correção: Acessando .text
            });
        });
    }

    // --- 3. FINALIZAÇÃO ---
    sequence.push({
        id: crypto.randomUUID(),
        type: "final",
        label: "Salve Rainha",
        text: PRAYERS.salveRainha.text, // ✅ Correção: Acessando .text
    });

    return sequence;
}