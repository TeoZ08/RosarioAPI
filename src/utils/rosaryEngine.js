import { PRAYERS } from "../data/rosaryConstants";

// Agora aceita userIntention como argumento opcional
export function generateRosarySequence(mysteriesOfToday, userIntention = "") {
    const sequence = [];

    // --- 1. INÍCIO ---

    // Lógica de Texto do Oferecimento Personalizado
    let textOferecimento = PRAYERS.oferecimento.text;
    if (userIntention && userIntention.trim() !== "") {
        textOferecimento = `Divino Jesus, nós Vos oferecemos este Terço que vamos rezar, meditando nos mistérios da Vossa Redenção.\n\nColocamos em Vossas mãos as nossas intenções particulares: "${userIntention}".\n\nConcedei-nos, por intercessão da Virgem Maria, Mãe de Deus e nossa Mãe, as virtudes que nos são necessárias para bem rezá-lo e a graça de ganharmos as indulgências desta santa devoção.`;
    }

    // Oferecimento
    sequence.push({
        id: crypto.randomUUID(),
        type: "inicio",
        label: "Oferecimento",
        text: textOferecimento, // Usa o texto modificado
    });

    // Credo
    sequence.push({
        id: crypto.randomUUID(),
        type: "cruz",
        label: "Sinal da Cruz e Credo",
        text: PRAYERS.creio ? PRAYERS.creio.text : "Creio em Deus Pai...",
    });

    // Pai Nosso inicial
    sequence.push({
        id: crypto.randomUUID(),
        type: "conta-grande",
        label: "Pai Nosso",
        text: PRAYERS.paiNosso.text,
    });

    // 3 Ave Marias
    sequence.push({
        id: crypto.randomUUID(),
        type: "conta-pequena",
        label: "Ave Maria (Fé)",
        text: PRAYERS.aveMaria.text,
    });
    sequence.push({
        id: crypto.randomUUID(),
        type: "conta-pequena",
        label: "Ave Maria (Esperança)",
        text: PRAYERS.aveMaria.text,
    });
    sequence.push({
        id: crypto.randomUUID(),
        type: "conta-pequena",
        label: "Ave Maria (Caridade)",
        text: PRAYERS.aveMaria.text,
    });

    // Glória
    sequence.push({
        id: crypto.randomUUID(),
        type: "gloria",
        label: "Glória",
        text: PRAYERS.gloria.text,
    });

    // --- 2. OS 5 MISTÉRIOS ---

    if (Array.isArray(mysteriesOfToday)) {
        mysteriesOfToday.forEach((m, index) => {
            const labelMisterio =
                typeof m === "string" ? m : m.label || `Mistério ${index + 1}`;
            const textoBiblico = typeof m === "string" ? "" : m.text || "";
            const imagemMisterio = typeof m === "string" ? null : m.image || null;

            // Pai Nosso do Mistério
            sequence.push({
                id: crypto.randomUUID(),
                type: "pai-nosso-misterio",
                label: "Pai Nosso",
                text: PRAYERS.paiNosso.text,
                mysteryInfo: {
                    number: index + 1,
                    label: labelMisterio,
                    description: textoBiblico,
                    image: imagemMisterio,
                },
            });

            // 10 Ave Marias
            for (let i = 1; i <= 10; i++) {
                sequence.push({
                    id: crypto.randomUUID(),
                    type: "conta-pequena",
                    label: `${i}ª Ave Maria`,
                    text: PRAYERS.aveMaria.text,
                    mysteryContextImage: imagemMisterio,
                });
            }

            // Glória
            sequence.push({
                id: crypto.randomUUID(),
                type: "gloria",
                label: "Glória",
                text: PRAYERS.gloria.text,
            });

            // Jaculatória
            sequence.push({
                id: crypto.randomUUID(),
                type: "jaculatoria",
                label: "Jaculatória",
                text: PRAYERS.jaculatoria.text,
            });
        });
    }

    // --- 3. FINALIZAÇÃO ---
    sequence.push({
        id: crypto.randomUUID(),
        type: "final",
        label: "Salve Rainha",
        text: PRAYERS.salveRainha.text,
    });

    sequence.push({
        id: crypto.randomUUID(),
        type: "cruz", // Reusa o ícone da cruz
        label: "Encerramento",
        text: "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
    });

    return sequence;
}