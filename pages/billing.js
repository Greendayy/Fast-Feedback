import { Button } from '@chakra-ui/core';

export default function Billing() {
  const goToBillingPortal = () => {
    QRCode.toCanvas(canvas, `${getTrade}+''`, function (error, data) {
      if (error) {
        toast({
          title: 'Failed!',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }
      if (data) {
        toast({
          title: 'Success!',
          description: 'Please scan the QR code!',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        onClose();
      }
    });
  };
  return (
    <div>
      <canvas id="canvas"></canvas>

      <Button mr={3} fontWeight="medium">
        Cancel
      </Button>
      <Button
        id="Paid"
        backgroundColor="#99FFFE"
        color="#194D4C"
        fontWeight="medium"
        type="submit"
        Loading={() => setBillingLoading(true)}
      >
        Paid
      </Button>
    </div>
  );
}
