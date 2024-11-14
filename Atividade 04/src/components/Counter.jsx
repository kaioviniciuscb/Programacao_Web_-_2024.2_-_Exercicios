import { useState, useEffect } from "react";

export function Counter() {
    const [counter, setCounter] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [isStarted, setIsStarted] = useState(false); // serve para controlar a visibilidade dos botões

    useEffect(() => {
        if (isActive) {
            const interval = setInterval(() => {
                setCounter(prevCounter => prevCounter + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isActive]);

    // Função para iniciar o contador
    function startCounter() {
        setIsActive(true);
        setIsStarted(true); // Ao iniciar, marca o contador como iniciado
    }

    // Função para parar o contador
    function stopCounter() {
        setIsActive(false);
        setShowButtons(true); // Assim que para o contador, aparece os botões de 'continuar' e 'zerar'
    }

    // Função para continuar o contador
    function continueCounter() {
        setIsActive(true);
        setShowButtons(false); // Caso opte por continuar, os botões de 'continuar' e 'zerar' desaparecem
    }

    // Função para zerar o contador
    function resetCounter() {
        setCounter(0);
        setIsActive(false);
        setShowButtons(false);
        setIsStarted(false); // Reseta também o estado de iniciado
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="flex flex-col items-center justify-center space-y-6">
                <h1 className="text-5xl mb-6">Contador: {counter}</h1>
    
                {!isStarted && (
                    <div className="flex space-x-4 gap-6">
                        <button
                            onClick={startCounter}
                            className="bg-blue-500 text-white text-xl p-4 rounded-md hover:bg-blue-400"
                        >
                            Iniciar Contador
                        </button>
                    </div>
                )}

                {isStarted && !showButtons && (
                    <div className="flex space-x-4 gap-6">
                        <button
                            onClick={stopCounter}
                            className="bg-orange-500 text-white text-xl p-4 rounded-md hover:bg-orange-400"
                        >
                            Parar Contador
                        </button>
                    </div>
                )}

                {showButtons && (
                    <div className="flex space-x-4 gap-6">
                        <button
                            onClick={continueCounter}
                            className="bg-green-500 text-white text-xl p-4 rounded-md hover:bg-green-400"
                        >
                            Continuar
                        </button>
    
                        <button
                            onClick={resetCounter}
                            className="bg-red-500 text-white text-xl p-4 rounded-md hover:bg-red-400"
                        >
                            Zerar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );    
}