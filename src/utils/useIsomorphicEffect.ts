import { useEffect, useLayoutEffect } from "react";

//@ts-ignore
const useIsomorphicEffect = process.browser ? useLayoutEffect : useEffect;

export default useIsomorphicEffect;
