export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './beneficiary.service';
import { BeneficiaryService } from './beneficiary.service';
export * from './pharmacy.service';
import { PharmacyService } from './pharmacy.service';
export * from './systemAdmin.service';
import { SystemAdminService } from './systemAdmin.service';
export const APIS = [AuthenticationService, BeneficiaryService, PharmacyService, SystemAdminService];
