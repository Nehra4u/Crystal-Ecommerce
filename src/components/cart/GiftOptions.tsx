import Checkbox from '@/components/ui/Checkbox';
import Card from '@/components/ui/Card';

interface GiftOptionsProps {
  onGiftBagChange: (checked: boolean) => void;
  onGiftBoxChange: (checked: boolean) => void;
}

const GiftOptions = ({ onGiftBagChange, onGiftBoxChange }: GiftOptionsProps) => {
  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        For your energy, mind or personal space
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-xl">🎁</span>
          <div className="flex-1">
            <Checkbox
              label="LARIMARITA GIFT BAG"
              description="59 CZK"
              onChange={(e) => onGiftBagChange(e.target.checked)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-xl">📦</span>
          <div className="flex-1">
            <Checkbox
              label="COURAGE GIFT BOX"
              description="990 CZK - You can find gift contents by adding it to the cart"
              onChange={(e) => onGiftBoxChange(e.target.checked)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GiftOptions;
