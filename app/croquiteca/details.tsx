import { useRouter } from 'next/navigation';
import { Route } from './columns';

const ClimbingDetails = ({data, back}: any) => {
  const router = useRouter();
  const climbingDetailsData = data.original as Route;

  const handleBack = () => {
    back();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Mais Informações</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Graduação:</h2>
          <p>{climbingDetailsData.graduation}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Tamanho:</h2>
          <p>{climbingDetailsData.size}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Nº de enfiadas:</h2>
          <p>{climbingDetailsData.pitchNumbers}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Material necessário:</h2>
          <p>{climbingDetailsData.requiredEquipments}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Data da conquista:</h2>
          <p>{climbingDetailsData.dateOfConquer}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Conquistadores:</h2>
          <p>{climbingDetailsData.conquerors}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Da escalada:</h2>
          <p>{climbingDetailsData.description}</p>
        </div>

        <button
          className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleBack}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default ClimbingDetails;
