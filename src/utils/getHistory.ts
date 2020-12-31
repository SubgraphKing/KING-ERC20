import { BigInt } from "@graphprotocol/graph-ts";
import { History, Transaction } from "../../generated/schema";
import { constants, TOKEN_ADDRESS } from "./CONSTS";
import { loadTotalSupply, loadName, loadSymbol } from "./loadContracts";

export function getHistory(
  tx: Transaction | null,
  block: BigInt | null = null
): History {

  let history = History.load(TOKEN_ADDRESS);

  if (history == null) {
    let totalSupply = loadTotalSupply();
    let name = loadName();
    let symbol = loadSymbol();

    history = new History(TOKEN_ADDRESS);
    history.name = name;
    history.symbol = symbol;
    history.totalSupply = totalSupply;
    history.tokenTransferCount = constants.BIGINT_ZERO;
    history.tokenHolderCount = constants.BIGINT_ZERO;
    history.totalAddressCount = constants.BIGINT_ZERO;
    history.save();
  }

  return history as History;
}
