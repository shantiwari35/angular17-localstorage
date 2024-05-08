import { JsonPipe } from '@angular/common';
import { Component, ElementRef, OnInit, Signal, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, Subject, single } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
    @ViewChild('exampleModal') model: ElementRef | undefined;
    studentObj: Student = new Student();
    studentList:Student[]=[];
    editMode=new BehaviorSubject(false);
    ngOnInit(): void {
    // debugger;
        const localData=localStorage.getItem('angular17crud');
        if(localData){
        this.studentList=JSON.parse(localData);
        }
    }
    openModel() {
        const model = document.getElementById('exampleModal');
        console.log(model);
        if (model) {
            model.style.display = 'block';
        }
    }

    closeModel() {
        this.studentObj=new Student();
        console.log(this.model);
        if (this.model) {
            this.model.nativeElement.style.display = 'none';
        }
    }

    saveStudent() {
        const isLocalPresent = localStorage.getItem('angular17crud');
        if (isLocalPresent) {
            const oldArr = JSON.parse(isLocalPresent);
            oldArr.push(this.studentObj);
            localStorage.setItem('angular17crud', JSON.stringify(oldArr));
            this.studentList=oldArr;
        } else {
            const arr = [];
            arr.push(this.studentObj);
            localStorage.setItem('angular17crud', JSON.stringify(arr));
            this.studentList=arr;
        }
        this.closeModel();
    }

    updateStudent(student:Student){
        this.studentObj=student;
        this.openModel();
    }

    deleteStudent(id:string){
    this.studentList=this.studentList.filter(item=>item.id != id);
    localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    }
}


export class Student {
    id:string=new Date().toUTCString();
    name: string = '';
    mobileNo: string = '';
    email: string = '';
    city: string = '';
    state: string = '';
    pincode: string = '';
    address: string = '';

}