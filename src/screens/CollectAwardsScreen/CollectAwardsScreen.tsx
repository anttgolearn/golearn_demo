import React from "react";

type CollectAwardsScreenProps = {
  awards: Array<{ id: string; name: string; icon?: string }>;
  onDone?: () => void;
};

export const CollectAwardsScreen: React.FC<CollectAwardsScreenProps> = ({ awards, onDone }) => {
  return (
    <div className="container mx-auto p-6 max-w-xl text-center">
      <h1 className="text-2xl font-bold mb-2">Phần thưởng mới</h1>
      <p className="text-muted-foreground mb-6">Bạn vừa mở khóa các huy hiệu sau</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {awards.map((a) => (
          <div key={a.id} className="border rounded p-4">
            <div className="text-3xl mb-2">{a.icon || "🏅"}</div>
            <div className="font-semibold">{a.name}</div>
          </div>
        ))}
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onDone}>Xong</button>
    </div>
  );
};

export default CollectAwardsScreen;


