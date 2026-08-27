import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faAddressCard, faAngleLeft, faArrowDown, faArrowUpFromBracket, faBars, faBed, faBoxes, faCalendar, faCalendarDays, faCheck, faCheckCircle, faChevronRight, faCircleCheck, faCircleExclamation, faCircleUser, faCoffee, faCreditCard, faDownload, faEllipsis, faEnvelope, faEye, faFileArrowDown, faHouse, faMinus, faMoneyBill, faPenToSquare, faPhone, faPlus, faSquareParking, faTags, faTrashCan, faUser, faUsers, faWaterLadder, faWifi, faXmark } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-icon',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
})
export class IconComponent {

  private readonly ICONS: Record<string, any> = {
    faCoffee: faCoffee,
    faCreditCard: faCreditCard,
    faXmark: faXmark,
    faCircleExclamation: faCircleExclamation,
    faEye: faEye,
    faPenToSquare: faPenToSquare, // edit
    faTrashCan: faTrashCan, // delete
    faPlus: faPlus,
    faMinus: faMinus,
    faBed: faBed,
    faUsers: faUsers,
    faUser: faUser,
    faEllipsis: faEllipsis,
    faPhone: faPhone,
    faAddressCard: faAddressCard,
    faEnvelope: faEnvelope,
    faCircleUser: faCircleUser,
    faCircleCheck: faCircleCheck,
    faAngleLeft: faAngleLeft,
    faCheckCircle: faCheckCircle,
    faCalendar: faCalendar,
    faFileArrowDown: faFileArrowDown,
    faSquareParking: faSquareParking,
    faWaterLadder: faWaterLadder,
    faWifi: faWifi,
    faBars: faBars,
    faTags: faTags,
    faMoneyBill: faMoneyBill,
    faCalendarDays: faCalendarDays,
    faHouse: faHouse,
    faChevronRight: faChevronRight,
    faArrowUpFromBracket: faArrowUpFromBracket,
    faArrowDown: faArrowDown,
    faDownload: faDownload,
    faCheck: faCheck,
    faBoxes: faBoxes,
  }

  @Input({ required : true}) name!: string;
  @Input() iconClass: string = '';
  icon!: IconDefinition;

  ngOnChanges(): void {
    this.icon = this.ICONS[this.name];
  }

}
