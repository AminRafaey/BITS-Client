export default function stateCloner(state) {
  return JSON.parse(JSON.stringify(state));
}
