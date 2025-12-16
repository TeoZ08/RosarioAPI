import { PRAYERS } from "../data/rosaryConstants";

export const generateRosarySequence = (mysteriesList = []) => {
    let sequence = [];
    let id = 0;

    // Helper para adicionar item
    const add = (type, label, content = null) => {
        sequence.push({
            id: id++,
            type,
            label,
            text: content || PRAYERS[type]?.text || ""
        });
    };

    // 1. Início
    add("inicio", "Sinal da Cruz", PRAYERS.sinalDaCruz.text);
    add("inicio", "Oferecimento", PRAYERS.oferecimento.text);
    add("inicio", "Credo", PRAYERS.creio.text);
    add("conta-grande", "Pai Nosso", PRAYERS.paiNosso.text);
    add("conta-pequena", "Ave Maria (Fé)", PRAYERS.aveMaria.text);
    add("conta-pequena", "Ave Maria (Esperança)", PRAYERS.aveMaria.text);
    add("conta-pequena", "Ave Maria (Caridade)", PRAYERS.aveMaria.text);
    add("gloria", "Glória", PRAYERS.gloria.text);

    // 2. Os 5 Mistérios
    for (let i = 0; i < 5; i++) {
        // Título do Mistério (ex: A Anunciação)
        const mysteryTitle = mysteriesList[i] ? `${i + 1}º Mistério: ${mysteriesList[i]}` : `${i + 1}º Mistério`;

        add("misterio", mysteryTitle, "Contemplamos este mistério...");

        add("conta-grande", "Pai Nosso", PRAYERS.paiNosso.text);

        // 10 Ave Marias
        for (let j = 1; j <= 10; j++) {
            add("conta-pequena", `Ave Maria (${j}/10)`, PRAYERS.aveMaria.text);
        }

        add("gloria", "Glória", PRAYERS.gloria.text);
        add("jaculatoria", "Ó meu Jesus", PRAYERS.jaculatoria.text);
    }

    // 3. Finalização
    add("final", "Salve Rainha", PRAYERS.salveRainha.text);

    return sequence;
};