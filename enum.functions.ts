export function allEnumValues<T>(E: { [s: number]: string }): T[] {
    // NOTE : pour les enum avec des valeurs numeriques : les valeurs sont aussi dans les keys
    //             ex : enum {"Val1"=0, "Val2"=1, "Val3"=2}
    //                  keys: ["Val1", "Val2", "Val3", 0, 1, 2]
    //
    //        mais pas pour les enum avec des valeurs en string
    //             ex : enum {"Val1"="a", "Val2"="b", "Val3"="c"}
    //                  keys: ["Val1", "Val2", "Val3"]
    //        (WTF...)
    //        donc on les filtres !
    const initKeys = Object.keys(E);
    const filteredKeys = initKeys.filter(k => isNaN(Number(k)));

    const result = filteredKeys.map(key => E[key]);
    return result as T[];
}