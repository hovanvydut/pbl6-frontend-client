export class DomHelper {
    public static preventSpreadingEvent(event: Event) {
        event.stopPropagation();
        event.preventDefault();
    }

    public static isClickOutSide(parent: Element | HTMLElement | any, child: Element | HTMLElement | any): boolean {
        if (!parent || !child) {
            return false;
        }

        // element is element or descendant elements
        return !parent.contains(child);
    }
}
