import { UserSearchCriteriaDto } from 'src/modules/users/dto/users.dto';

interface SearchCriteria {
    [key: string]: string | number | undefined;
}

export function filterCriteria(criteria: UserSearchCriteriaDto): SearchCriteria {
    return Object.fromEntries(Object.entries(criteria).filter(([_, value]) => value !== undefined));
}
