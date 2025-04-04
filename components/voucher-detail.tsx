  {/* Redeem Button for unredeemed vouchers */}
  {status === "Unredeemed" && (
    <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 rounded-full text-xs-bold !text-white">
      <Image src="/icons/redemption.svg" width={16} height={16} alt="Redemption icon" />
      Redeem
    </Button>
  )} 