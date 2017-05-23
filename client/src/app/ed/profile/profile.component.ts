import { lineDrawer } from '../../../lib4et5/editor/lineDrawer';
import { bsplineDrawer } from '../../../lib4et5/editor/bsplineDrawer';
import { EdService } from '../edService';
import { editor } from '../../../lib4et5/editor/editor';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

   @ViewChild('profileCanvas') public canvasRef: ElementRef;

    editor:editor;
    constructor(private edService: EdService) {
        this.editor = this.edService.editor();
        this.edService.profileComponent = this;
    }


    canvas:HTMLCanvasElement;
    bsplineDrawer = new bsplineDrawer();
    lineDrawer = new lineDrawer();

    points:number[][] = [];
    pointIndex = -1;
    isDown:boolean;
    doUpdate = false;
    selectedIndex = -1;

    maxCanvasWidth = 290;
    maxCanvasHeight = 290;

    offsetX = 20;
    offsetY = 20;
    
    //profileExamples:profileExamples = inject(profileExamples);
    
    isLines = false;
    isSmooth = true;

    ngOnInit() {

        this.canvas = this.canvasRef.nativeElement;
        this.canvas.style.border = 'solid 1px red';
        this.canvas.width = this.maxCanvasWidth;
        this.canvas.height = this.maxCanvasHeight;

        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(<MouseEvent> e));
        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(<MouseEvent> e))
        this.canvas.addEventListener('mouseup', (e) => this.onMouseUp( <MouseEvent> e))
    

        this.points = [[0,0],[295,0],[295,295],[0,295]];
        this.draw();
    }


    setAsLines() 
    {
        this.isSmooth = false;
        this.isLines = true;
        if (this.selectedIndex >= 0)
        {
            var l = this.editor.workspace.editorObjects[this.selectedIndex];
            l.profileSmooth = false;
            this.draw(); this.updateEditor();
        }
        
    };

    setAsSmooth()
    {
        this.isLines = false;
        this.isSmooth = true;
        if (this.selectedIndex >= 0)
        {
            var l = this.editor.workspace.editorObjects[this.selectedIndex];
            l.profileSmooth = true;
            this.draw(); this.updateEditor();
        }
    }

    refresh()
    {
        this.setSelectedIndex(this.selectedIndex);
    }

    setSelectedIndex(i:number)
    {
        this.selectedIndex = i;
        if (i < 0)
            return;

        //console.log('profileView.setSelectedIndex');

        var l = this.editor.workspace.editorObjects[i];
        var profileBounds = l.profileBounds;
        var boundW = profileBounds[2] - profileBounds[0];
        var boundH = profileBounds[3] - profileBounds[1];
        var canvasWidth = this.maxCanvasWidth;
        var canvasHeight = this.maxCanvasHeight;
        if (boundH > boundW)
            canvasWidth = canvasHeight * boundW/boundH;
        else
            canvasHeight = canvasWidth * boundH / boundW;

        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        
        // convert points in pixels
        this.points = [];
        for (var j=0; j < l.profilePoints.length; ++j)
        {
            var x = l.profilePoints[j][0];
            var y = l.profilePoints[j][1];
            /*
            var px = (x - profileBounds[0]) /  (profileBounds[2] - profileBounds[0]) * this.canvas.width;
            var py = this.canvas.height - (y - profileBounds[1]) /  (profileBounds[3] - profileBounds[1]) * this.canvas.height;
            */

            var drawWidth = this.canvas.width - 2*this.offsetX;
            var drawHeight = this.canvas.height - 2*this.offsetY;


            var px = this.offsetX + (x - profileBounds[0]) /  (profileBounds[2] - profileBounds[0]) * drawWidth;
            var py = drawHeight + this.offsetY  - (y - profileBounds[1]) /  (profileBounds[3] - profileBounds[1]) * drawHeight;
            
            this.points.push([px, py]);
        }
        this.draw();
    }

    updateEditor()
    {
        if (this.selectedIndex < 0)
            return;

        var l = this.editor.workspace.editorObjects[this.selectedIndex];
        var profileBounds = l.profileBounds;
        
        // convert points to real coordinates
        var profilePoints = [];
        for (var j=0; j < this.points.length; ++j)
        {
            var px = this.points[j][0];
            var py = this.points[j][1];
            px -= this.offsetX;
            py -= this.offsetY;
            
            var drawWidth = this.canvas.width - 2*this.offsetX;
            var drawHeight = this.canvas.height - 2*this.offsetY;

            var x = (px / drawWidth) * (profileBounds[2] - profileBounds[0]) + profileBounds[0];
            var y = (py - drawHeight) / drawHeight * (profileBounds[3] - profileBounds[1]) + profileBounds[1]; 
            y *= -1;
            profilePoints.push([x, y]);
        }

        l.setProfilePoints(profilePoints);
        this.editor.renderer.updateFloatTextures(l.sd);
        this.editor.setUpdateFlag();
        this.editor.setRenderFlag();
    }

    draw()
    {
        if (this.selectedIndex < 0)
            return;

        var l = this.editor.workspace.editorObjects[this.selectedIndex];

        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        
        
        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.fillStyle = "rgba(0,0,0,1)"; 
        if (l.profileSmooth)
            this.bsplineDrawer.drawSpline(this.points, this.canvas);
        else
            this.lineDrawer.drawLine(this.points, this.canvas);
        
        ctx.strokeStyle = "rgba(128,128,128,1)";
        ctx.beginPath();
        ctx.moveTo(this.points[0][0],this.points[0][1]);
        for(var i = 0;i < this.points.length;i++){
            ctx.lineTo(this.points[i][0],this.points[i][1]);
        }

        ctx.stroke();
        ctx.closePath();

        
        // draw points        
        for(var i = 0;i < this.points.length;i++){
            ctx.fillStyle = "rgba(0,255,0,1)";
            if (this.pointIndex == i)
                ctx.fillStyle = "rgba(255,0,0,1)";
            
            ctx.beginPath();
            ctx.arc(this.points[i][0],this.points[i][1],5,0,Math.PI*2,false);
            ctx.fill();
            ctx.closePath();   
        }
    }

    onMouseDown(e:MouseEvent)
    {
        this.pointIndex = -1;
        for(var i = 0;i < this.points.length;i++)
        {
            var dx = e.offsetX - this.points[i][0];
            var dy = e.offsetY - this.points[i][1];
            if (dx*dx + dy*dy < 5*5)
            {
                this.pointIndex = i;
            }
        }

        this.draw();
        if (this.pointIndex >= 0)
        {
            this.isDown = true;
            this.doUpdate = true;
        }
    }

    onMouseUp(e:MouseEvent)
    {
        this.isDown = false;
    }

    onMouseMove(e:MouseEvent)
    {
        if (this.isDown)
        {
            this.points[this.pointIndex][0] = e.offsetX;
            this.points[this.pointIndex][1] = e.offsetY;
            this.doUpdate = true;
        }
    }

    updateLoop()
    {
        if (this.doUpdate)
        {
            this.doUpdate = false;
            this.draw();
            this.updateEditor();
        }
    }        
}
