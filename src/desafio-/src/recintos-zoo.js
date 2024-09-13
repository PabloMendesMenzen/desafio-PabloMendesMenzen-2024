
class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
        LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
        CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
        MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
        GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false },
      };
    }
  
    analisaRecintos(tipoAnimal, quantidade) {
      const animalInfo = this.animais[tipoAnimal.toUpperCase()];
      
      // Validação de animal
      if (!animalInfo) {
        return { erro: 'Animal inválido' };
      }
  
      // Validação de quantidade
      if (!Number.isInteger(quantidade) || quantidade <= 0) {
        return { erro: 'Quantidade inválida' };
      }
  
      const tamanhoNecessario = animalInfo.tamanho * quantidade;
      const recintosViaveis = [];
  
      for (const recinto of this.recintos) {
        let espacoOcupado = recinto.animais.reduce((sum, a) => {
          const animalTamanho = this.animais[a.especie]?.tamanho || 0;
          return sum + (animalTamanho * a.quantidade);
        }, 0);
  
        if (recinto.animais.length > 1) espacoOcupado += 1; // 1 espaço extra para convivência
  
        const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
  
        // Validação de bioma e regras específicas
        if (
          animalInfo.bioma.includes(recinto.bioma) &&
          espacoLivre >= tamanhoNecessario &&
          this.verificaCompatibilidade(animalInfo, recinto)
        ) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - tamanhoNecessario} total: ${recinto.tamanhoTotal})`);
        }
      }
  
      if (recintosViaveis.length === 0) {
        return { erro: 'Não há recinto viável' };
      }
  
      return { recintosViaveis: recintosViaveis.sort() };
    }
  
    verificaCompatibilidade(novoAnimal, recinto) {
        for (const animal of recinto.animais) {
          const especieInfo = this.animais[animal.especie];
          if (especieInfo.carnivoro && novoAnimal.carnivoro && especieInfo !== novoAnimal) {
            return false; // Carnívoros só podem estar com a própria espécie
          }
          if (novoAnimal.especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
            return false; // Hipopótamos só toleram outras espécies em savana e rio
          }
          if (novoAnimal.especie === 'MACACO' && recinto.animais.length === 0 && novoAnimal.quantidade === 1) {
            return false; // Um macaco sozinho não é permitido
          }
        }
        return true;
      }
 }      
export { RecintosZoo as RecintosZoo };
