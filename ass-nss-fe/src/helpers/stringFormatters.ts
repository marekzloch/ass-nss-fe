
export function formatCzechDate(isoString: string): string {
    const date = new Date(isoString);
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}. ${month}. ${year}`;
  }
  
 export function formatCzechTime(isoString: string): string {
    const date = new Date(isoString);
  
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }