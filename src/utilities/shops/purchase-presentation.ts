interface ShopPurchasePresentationResult {
  rewards?: {
    cards?: unknown[]
    taskExitModals?: unknown[]
  }
}

export function shouldShowShopPurchaseOverlay(
  result: ShopPurchasePresentationResult,
): boolean {
  return Boolean(
    result.rewards?.cards?.length || result.rewards?.taskExitModals?.length,
  )
}
