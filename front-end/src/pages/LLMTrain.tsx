import React, { useState, useRef, useCallback, useEffect } from 'react';

interface Entity {
  start: number;
  end: number;
  label: string;
  text: string;
}

interface TrainingData {
  text: string;
  entities: [number, number, string][];
}

export const LLMTrain: React.FC = () => {
  const [serverList, setServerList] = useState("");
  const [servers, setServers] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [selectedLabel, setSelectedLabel] = useState("SERVER_NAME");
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);
  const [isListMode, setIsListMode] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const labels = [
    { value: "SERVER_NAME", color: "#FF6B6B", name: "Nome do Servidor" },
    { value: "REGION", color: "#4ECDC4", name: "Região" },
    { value: "MAP", color: "#45B7D1", name: "Mapa" },
    { value: "GAMEPLAY", color: "#96CEB4", name: "Gameplay" },
    { value: "SERVER_NUMBER", color: "#FFEAA7", name: "Número" }
  ];

  // Processa a lista de servidores quando o texto muda
  useEffect(() => {
    if (serverList.trim()) {
      const serverArray = serverList
        .split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 0);
      setServers(serverArray);
    }
  }, [serverList]);

  // Inicia o modo de anotação
  const startAnnotation = () => {
    if (servers.length === 0) {
      alert("Cole a lista de servidores primeiro!");
      return;
    }
    setIsListMode(true);
    setCurrentIndex(0);
    setEntities([]);
  };

  const handleTextSelection = useCallback(() => {
    if (!isListMode) return;
    
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const selectedText = selection.toString().trim();
    
    if (!selectedText || !textRef.current) return;

    // Calcula posições relativas ao texto completo
    const textContent = textRef.current.textContent || "";
    const start = textContent.indexOf(selectedText);
    const end = start + selectedText.length;

    if (start === -1) return;

    // Verifica se já existe uma entidade nessa posição
    const existingEntity = entities.find(entity => 
      (start >= entity.start && start < entity.end) ||
      (end > entity.start && end <= entity.end) ||
      (start <= entity.start && end >= entity.end)
    );

    if (existingEntity) {
      alert("Já existe uma anotação nesta posição!");
      return;
    }

    // Adiciona nova entidade
    const newEntity: Entity = {
      start,
      end,
      label: selectedLabel,
      text: selectedText
    };

    setEntities(prev => [...prev, newEntity].sort((a, b) => a.start - b.start));
    
    // Remove seleção
    selection.removeAllRanges();
  }, [entities, selectedLabel, isListMode]);

  const removeEntity = (index: number) => {
    setEntities(prev => prev.filter((_, i) => i !== index));
  };

  const renderAnnotatedText = () => {
    if (!isListMode || servers.length === 0) return "";
    
    const currentText = servers[currentIndex];
    
    if (entities.length === 0) {
      return currentText;
    }

    let result = [];
    let lastIndex = 0;

    entities.forEach((entity, index) => {
      // Texto antes da entidade
      if (entity.start > lastIndex) {
        result.push(
          <span key={`text-${index}`}>
            {currentText.substring(lastIndex, entity.start)}
          </span>
        );
      }

      // Entidade anotada
      const labelColor = labels.find(l => l.value === entity.label)?.color || "#999";
      result.push(
        <span
          key={`entity-${index}`}
          className="px-1 py-0.5 rounded cursor-pointer hover:opacity-80"
          style={{ backgroundColor: labelColor, color: "white" }}
          onClick={() => removeEntity(index)}
          title={`${entity.label} (${entity.start}-${entity.end}) - Clique para remover`}
        >
          {entity.text}
        </span>
      );

      lastIndex = entity.end;
    });

    // Texto após a última entidade
    if (lastIndex < currentText.length) {
      result.push(
        <span key="text-end">
          {currentText.substring(lastIndex)}
        </span>
      );
    }

    return result;
  };

  const saveCurrentAnnotation = () => {
    if (!isListMode || entities.length === 0) {
      alert("Adicione pelo menos uma anotação!");
      return;
    }

    const currentText = servers[currentIndex];
    const newTrainingData: TrainingData = {
      text: currentText,
      entities: entities.map(e => [e.start, e.end, e.label] as [number, number, string])
    };

    setTrainingData(prev => [...prev, newTrainingData]);
    
    // Move para o próximo servidor
    nextServer();
  };

  const nextServer = () => {
    setEntities([]);
    if (currentIndex < servers.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      alert(`🎉 Todos os ${servers.length} servidores foram anotados!`);
      setIsListMode(false);
    }
  };

  const previousServer = () => {
    setEntities([]);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const skipServer = () => {
    nextServer();
  };

  const exportTrainingData = () => {
    const pythonFormat = `TRAIN_DATA = [\n${trainingData.map(item => 
      `    ("${item.text.replace(/"/g, '\\"')}", {\n        "entities": ${JSON.stringify(item.entities)}\n    })`
    ).join(',\n')}\n]`;

    const blob = new Blob([pythonFormat], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dayz_training_data.py';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const jsonData = {
      training_data: trainingData
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dayz_training_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isListMode) return;
      
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            saveCurrentAnnotation();
            break;
          case 'ArrowRight':
            e.preventDefault();
            nextServer();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            previousServer();
            break;
          case ' ':
            e.preventDefault();
            skipServer();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isListMode, currentIndex, entities]);

  if (!isListMode) {
    return (
      <div className="p-10 max-w-6xl mx-auto">
        <div className=" rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-white mb-6">
            🎮 Anotador Batch - Servidores DayZ
          </h1>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-2">
              Cole a lista de servidores (um por linha):
            </label>
            <textarea
              value={serverList}
              onChange={(e) => setServerList(e.target.value)}
              className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder={`OrigemZ Vanilla+ |Solo-Duo-Trio|RAIDTOKEN|1PP|NOVA SEASON
[WIPED 18.07] BattleGroundZ :: Chernarus [3PP][EU] | Vanilla++
MAG MiddleAgedGamers #1 PVE |FRESH-WIPED 3 June|
Ground Zero US2 | Solo/Duo/Trio | Weekend Raiding | High FPS
[BR] EPIDEMIC Z BRASIL VANILLA-1PP-GROUP-WIPE 08/07`}
            />
            <p className="text-sm text-white mt-2">
              📋 {servers.length} servidores detectados
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={startAnnotation}
              disabled={servers.length === 0}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              🚀 Iniciar Anotação ({servers.length} servidores)
            </button>
            
            {trainingData.length > 0 && (
              <>
                <button
                  onClick={exportTrainingData}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  📄 Exportar Python ({trainingData.length})
                </button>
                
                <button
                  onClick={exportJSON}
                  className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium"
                >
                  📋 Exportar JSON ({trainingData.length})
                </button>
              </>
            )}
          </div>

          {trainingData.length > 0 && (
            <div className="mt-6 p-4 bg-green-50 rounded-md">
              <h3 className="font-medium text-green-800 mb-2">📊 Progresso:</h3>
              <p className="text-green-700">
                <strong>{trainingData.length}</strong> servidores já anotados
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className=" rounded-lg shadow-lg p-6">
        {/* Header com progresso */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            🎮 Anotando Servidor {currentIndex + 1} de {servers.length}
          </h1>
          
          <button
            onClick={() => setIsListMode(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            ← Voltar à Lista
          </button>
        </div>

        {/* Barra de progresso */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-white mb-2">
            <span>Progresso</span>
            <span>{Math.round(((currentIndex) / servers.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex) / servers.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Seletor de label */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-2">
            Tipo de Entidade Atual:
          </label>
          <div className="flex flex-wrap gap-2">
            {labels.map(label => (
              <button
                key={label.value}
                onClick={() => setSelectedLabel(label.value)}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  selectedLabel === label.value
                    ? 'ring-2 ring-offset-2 ring-blue-500 transform scale-105'
                    : 'hover:scale-105'
                }`}
                style={{ 
                  backgroundColor: label.color, 
                  color: 'white',
                  opacity: selectedLabel === label.value ? 1 : 0.7
                }}
              >
                {label.name}
              </button>
            ))}
          </div>
        </div>

        {/* Texto atual para anotação */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-2">
            Servidor Atual (selecione o texto para anotar):
          </label>
          <div
            ref={textRef}
            className="p-4 border-2 border-dashed border-gray-300 rounded-md text-lg leading-relaxed cursor-text select-text min-h-[100px] flex items-center"
            onMouseUp={handleTextSelection}
            style={{ userSelect: 'text' }}
          >
            {renderAnnotatedText()}
          </div>
        </div>

        {entities.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3">
              Entidades Anotadas ({entities.length}):
            </h3>
            <div className="space-y-2">
              {entities.map((entity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className="px-2 py-1 rounded text-white text-sm font-medium"
                      style={{ backgroundColor: labels.find(l => l.value === entity.label)?.color }}
                    >
                      {entity.label}
                    </span>
                    <code className="text-sm  px-2 py-1 rounded">
                      ({entity.start}, {entity.end})
                    </code>
                    <span className="font-medium">"{entity.text}"</span>
                  </div>
                  <button
                    onClick={() => removeEntity(index)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Controles de navegação */}
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex gap-4">
            <button
              onClick={previousServer}
              disabled={currentIndex === 0}
              className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              ← Anterior
            </button>
            
            <button
              onClick={skipServer}
              className="px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 font-medium"
            >
              ⏭️ Pular
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={saveCurrentAnnotation}
              disabled={entities.length === 0}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              💾 Salvar & Próximo
            </button>
          </div>
        </div>

        {/* Atalhos do teclado */}
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h4 className="font-medium text-blue-800 mb-2">⌨️ Atalhos:</h4>
          <div className="text-sm text-blue-700 grid grid-cols-2 gap-2">
            <span><kbd className=" px-2 py-1 rounded">Ctrl+S</kbd> Salvar & Próximo</span>
            <span><kbd className=" px-2 py-1 rounded">Ctrl+→</kbd> Próximo (sem salvar)</span>
            <span><kbd className=" px-2 py-1 rounded">Ctrl+←</kbd> Anterior</span>
            <span><kbd className=" px-2 py-1 rounded">Ctrl+Space</kbd> Pular</span>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="mt-4 p-4 bg-green-50 rounded-md">
          <h4 className="font-medium text-green-800 mb-2">📊 Estatísticas:</h4>
          <div className="text-sm text-green-700">
            <p>Anotados: <strong>{trainingData.length}</strong> | Restantes: <strong>{servers.length - currentIndex - 1}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};